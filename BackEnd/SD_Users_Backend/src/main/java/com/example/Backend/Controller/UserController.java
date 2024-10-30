package com.example.Backend.Controller;

import com.example.Backend.Model.UserSummary;
import com.example.Backend.Service.UserService;
import lombok.Data;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    public boolean createUser(@RequestBody User user) {
        user.setRole("client");
        User existingUser = userService.findEmail(user.getEmail());

        if (existingUser != null) {
            System.out.println("Email already exists");
            return false;
        } else {
            if (user != null) {
                User savedUser = userService.insert(user);
                System.out.println("The data is being entered into the database...");

                UserSummary userSummary = new UserSummary();
                userSummary.setUserId(savedUser.getUserId());
                userSummary.setName(savedUser.getName());
                userSummary.setSurname(savedUser.getSurname());
                userSummary.setEmail(savedUser.getEmail());

                userService.sendUserSummary(userSummary)
                        .doOnSuccess(response -> System.out.println("Data successfully transferred: " + response))
                        .subscribe();

                return true;
            } else {
                System.out.println("Please fill in the fields");
                return false;
            }
        }
    }
    @GetMapping("/GetAllUsers")
    public Iterable<User> getAll(){return userService.GetAll();}
    @DeleteMapping("/DeleteUser/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        try {
            userService.deleteUser(id);

            userService.deleteUserSummary(id)
                    .doOnSuccess(response -> System.out.println("Data successfully deleted"))
                    .doOnError(error -> System.err.println("Deletion error: " + error.getMessage()))
                    .subscribe();

            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/UpdateUser/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User userDetails) {
        try {
            User updatedUser = userService.updateUser(id, userDetails);

            UserSummary userSummary = new UserSummary();
            userSummary.setUserId(updatedUser.getUserId());
            userSummary.setName(updatedUser.getName());
            userSummary.setSurname(updatedUser.getSurname());
            userSummary.setEmail(updatedUser.getEmail());

            userService.updateUserSummary(id, userSummary)
                    .doOnSuccess(response -> System.out.println("Data successfully transferred: " + response))
                    .doOnError(error -> System.err.println("Update error: " + error.getMessage()))
                    .subscribe();

            return ResponseEntity.ok(updatedUser);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
