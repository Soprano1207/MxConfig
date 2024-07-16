package entity

type User struct {
	Email           string            `json:"email"`
	Login           string            `json:"login"`
	Password        string            `json:"password"`
	Confirmpassword string            `json:"confirmpassword"`
	Firstname       string            `json:"firstname"`
	Lastname        string            `json:"lastname"`
	Token           interface{}       `json:"token"`
	Configurations  map[string]string `json:"configurations"`
}
