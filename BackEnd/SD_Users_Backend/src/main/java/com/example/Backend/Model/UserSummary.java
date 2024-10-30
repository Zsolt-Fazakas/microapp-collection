package com.example.Backend.Model;

import lombok.Data;

@Data
public class UserSummary {
    private Integer userId;
    private String name;
    private String surname;
    private String email;
}
