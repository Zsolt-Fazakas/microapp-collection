package com.example.Backend.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

@Entity
@Data
@ToString
public class UserSummary {
    @Id
    @Column(name = "user_id")
    private Integer userId;
    private String name;
    private String surname;
    private String email;
}
