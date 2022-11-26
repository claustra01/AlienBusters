package types

type Room struct {
	// Registered clients.
	clients map[*Client]bool

	// Inbound messages from the clients.
	broadcast chan []byte

	// Register requests from the clients.
	register chan *Client

	// Unregister requests from clients.
	unregister chan *Client

	RoomId map[string]int
}

func NewRoom() *Room {
	return &Room{
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[*Client]bool),
		RoomId:     make(map[string]int),
	}
}

func (r *Room) Run() {
	for {
		select {
		case client := <-r.register:
			r.clients[client] = true
			// u, _ := uuid.NewRandom()
			// r.RoomId[u.String()] = 1
			// client.RoomId = u.String()
		case client := <-r.unregister:
			if _, ok := r.clients[client]; ok {
				if n := r.RoomId[client.RoomId] - 1; n < 1 {
					delete(r.RoomId, client.RoomId)
				}
				delete(r.clients, client)
				close(client.send)
			}
		case message := <-r.broadcast:
			for client := range r.clients {
				select {
				case client.send <- message:
				default:
					close(client.send)
					delete(r.clients, client)
				}
			}
		}
	}
}
