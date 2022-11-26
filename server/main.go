package main

import (
	"log"

	"hajimete_hackathon_2022/types"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/websocket/v2"
	"github.com/google/uuid"
)

func main() {
	app := fiber.New()

	room := types.NewRoom()

	go room.Run()

	app.Use(cors.New())
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	app.Get("/room", func(c *fiber.Ctx) error {
		return c.JSON(&room.RoomId)
	})

	app.Get("/new_room", func(c *fiber.Ctx) error {
		UUID, _ := uuid.NewRandom()
		room.RoomId[UUID.String()] = 1
		return c.SendString(UUID.String())
	})

	app.Use("/ws", func(c *fiber.Ctx) error {
		// IsWebSocketUpgrade returns true if the client
		// requested upgrade to the WebSocket protocol.
		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})

	app.Get("/ws/:id", room.ServeWs)

	log.Fatal(app.Listen(":8080"))
	// Access the websocket server: ws://localhost:3000/ws/123?v=1.0
	// https://www.websocket.org/echo.html
}
