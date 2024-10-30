package com.example.Backend.Service;

import com.example.Backend.Model.UserSummary;
import com.example.Backend.Repository.UserSummaryRepository;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserSummaryService {
    @Autowired
    private UserSummaryRepository userSummaryRepository;

    public UserSummary createUserSummary(UserSummary userSummary) {
        return userSummaryRepository.save(userSummary);
    }
    public void deleteUserSummary(Integer id) {
        if (!userSummaryRepository.existsById(id)) {
            throw new ResourceNotFoundException("UserSummary not found with id: " + id);
        }
        userSummaryRepository.deleteById(id);
    }

    public UserSummary updateUserSummary(Integer id, UserSummary userSummaryDetails){
        UserSummary userSummary = userSummaryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        userSummary.setUserId(userSummaryDetails.getUserId());
        userSummary.setName(userSummaryDetails.getName());
        userSummary.setSurname(userSummaryDetails.getSurname());
        userSummary.setEmail(userSummaryDetails.getEmail());

        return userSummaryRepository.save(userSummary);
    }
    public UserSummary getUserSummaryById(Integer id) {
        Optional<UserSummary> userSummary = userSummaryRepository.findById(id);
        return userSummary.orElse(null);
    }

}
