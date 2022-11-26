package types

type Pointer struct {
	PointerX float64 `json:"x"`
	PointerY float64 `json:"y"`
}

type Post struct {
	Room  int     `json:"room"`
	UUID  string  `json:"name"`
	Pos   Pointer `json:"pos"`
	Score int     `json:"score"`
}

type SendData struct {
	Room     int `json:"room"`
	Question int `json:"question"`
}
