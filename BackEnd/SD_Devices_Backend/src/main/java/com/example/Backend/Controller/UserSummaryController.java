package com.example.Backend.Controller;

import com.example.Backend.Model.Device;
import com.example.Backend.Model.UserSummary;
import com.example.Backend.Service.UserSummaryService;
import lombok.Data;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@Data
public class UserSummaryController {
    @Autowired
    UserSummaryService userSummaryService;
    @PostMapping("/CreateSummary")
    public ResponseEntity<UserSummary> createUserSummary(@RequestBody UserSummary userSummary) {
        try {
            UserSummary createUserSummary = userSummaryService.createUserSummary(userSummary);
            return ResponseEntity.status(HttpStatus.CREATED).body(createUserSummary);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @DeleteMapping("/DeleteSummary/{id}")
    public ResponseEntity<Void> deleteUserSummary(@PathVariable Integer id) {
        try {
            userSummaryService.deleteUserSummary(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/UpdateSummary/{id}")
    public ResponseEntity<UserSummary> updateUserSummary(@PathVariable Integer id, @RequestBody UserSummary userSummaryDetails) {
        try {
            UserSummary updatedUserSummary = userSummaryService.updateUserSummary(id, userSummaryDetails);
            return ResponseEntity.ok(updatedUserSummary);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/GetSummary/{id}")
    public ResponseEntity<UserSummary> getSummaryById(@PathVariable Integer id) {
        try {
            UserSummary userSummary = userSummaryService.getUserSummaryById(id);
            if (userSummary != null) {
                return ResponseEntity.ok(userSummary);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
