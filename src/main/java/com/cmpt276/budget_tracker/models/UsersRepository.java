package com.cmpt276.budget_tracker.models;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users,Integer>{
    Optional<Users> findByEmail(String email);
    Optional<Users> findByUsername(String username);

    List<Users> findByUid(int uid);
    List<Users> findByUsernameAndPasswordAndEmail(String username, String password, String email);
}

