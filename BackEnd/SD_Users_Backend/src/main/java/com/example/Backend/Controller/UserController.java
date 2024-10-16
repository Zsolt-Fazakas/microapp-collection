package com.example.Backend.Controller;

import com.example.Backend.Service.UserService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.Backend.Model.User;

import java.util.Objects;

@RestController
@CrossOrigin
@Data
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/Login")
    public User check(@RequestBody User user) {
        User u1 = userService.findEmail(user.getEmail());
        if (u1 != null && Objects.equals(u1.getPassword(), user.getPassword())) {
            System.out.println("Conectare cu succes");
            return  u1;
        }
        else {
            System.out.println("Conectare esuata");
            return null;
        }
    }

    @PostMapping("/SignIn")
    public boolean createUser(@RequestBody User user){
        user.setRole("client");

    }
}
