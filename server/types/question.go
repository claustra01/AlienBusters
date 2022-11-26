package types

import (
	"math/rand"
	"time"
)

func GenerateQ() []int {
	q := make([]int, 0)
	rand.Seed(time.Now().UnixNano())

	for i := 0; i < 10; i++ {
		q = append(q, rand.Intn(25))
	}
	return q
}
