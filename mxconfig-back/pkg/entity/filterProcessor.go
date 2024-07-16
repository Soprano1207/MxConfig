package entity

type Filter_Processor struct {
	ID          string      `json:"-"`
	Name        string      `json:"name" binding:"required"`
	Multiselect bool        `json:"multiselect" binding:"required"`
	Items       interface{} `json:"items"`
}
