package com.ucig.fuelpass.seeders;

import com.ucig.fuelpass.enums.RoleType;
import com.ucig.fuelpass.models.Role;
import com.ucig.fuelpass.models.User;
import com.ucig.fuelpass.repositories.RoleRepo;
import com.ucig.fuelpass.repositories.UserRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * A class to seed the basic users and roles to the DB
 */
@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepo userRepo;
    private final RoleRepo roleRepo;

    public DatabaseSeeder(UserRepo userRepo, RoleRepo roleRepo) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
    }

    @Override
    public void run(String... args) {
        Role aircraftOperator = new Role(RoleType.AIRCRAFT_OPERATOR.getLabel(), RoleType.AIRCRAFT_OPERATOR.name());
        Role operationsManager = new Role(RoleType.OPERATIONS_MANAGER.getLabel(), RoleType.OPERATIONS_MANAGER.name());
        if(roleRepo.count() == 0){
            roleRepo.save(aircraftOperator);
            roleRepo.save(operationsManager);
        }
        if (userRepo.count() == 0) {
            /*
            User with Aircraft Operator role
            username: aircraft_operator1@fuelpass.com
            password: Operator@123
             */
            userRepo.save(new User( "$2a$12$d5X8b2hSmf1yKRovRRmOCeSoPhPNU1xdJ5bVbSO0YNM8iA5Gh0ZbK","aircraft_operator1@fuelpass.com",System.currentTimeMillis(), aircraftOperator));

                        /*
            User with Operation Manager role
            username: operation_manager1@fuelpass.com
            password: Manager@123
             */
            userRepo.save(new User("$2a$12$ghWtDVeQpsF1KvS1E22mk.9fwejK6VIRiGFOOr8BF.084S1Y49tl.", "operation_manager1@fuelpass.com",System.currentTimeMillis(), operationsManager));

        }
    }
}
