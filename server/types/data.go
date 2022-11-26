package types

type V interface {
}

type Pointer struct {
	PointerX float64 `json:"x"`
	PointerY float64 `json:"y"`
}

type MouthPost struct {
	Mouth      bool    `json:"mouth"`
	Response   bool    `json:"response"`
	Room       int     `json:"room"`
	PlayerName Pointer `json:"player_name"`
}

type ResponsePost struct {
	Mouth      bool `json:"mouth"`
	Response   bool `json:"response"`
	Room       int  `json:"room"`
	PlayerName int  `json:"player_name"`
	Question   int  `json:"question"`
}
