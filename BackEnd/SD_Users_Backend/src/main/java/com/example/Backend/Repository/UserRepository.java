package com.example.Backend.Repository;

import com.example.Backend.Model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User,String> {
    User findByEmail (String Email);
}
