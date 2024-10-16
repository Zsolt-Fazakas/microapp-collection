package com.example.Backend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.ToString;

@Entity
@Data
@ToString
public class User {
    @Id
    private String name;
    private String surname;
    private String email;
    private String password;
    private String role;
}
