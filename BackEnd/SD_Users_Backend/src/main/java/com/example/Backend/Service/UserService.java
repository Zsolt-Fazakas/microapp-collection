package com.example.Backend.Service;

import com.example.Backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Backend.Model.User;
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public void insert (User user) {userRepository.save(user);}
    public User findEmail(String email) {return userRepository.findByEmail(email);}
}
