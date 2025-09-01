package com.ucig.fuelpass.services;

import com.ucig.fuelpass.Enums.OrderStatus;
import com.ucig.fuelpass.Models.Order;
import com.ucig.fuelpass.Models.User;
import com.ucig.fuelpass.Requests.CreateOrderRequest;
import com.ucig.fuelpass.Requests.OrderStatusRequest;
import com.ucig.fuelpass.repositories.OrderRepo;
import com.ucig.fuelpass.repositories.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    private final OrderRepo orderRepo;
    private final UserRepo userRepo;


    public OrderService(OrderRepo orderRepo, UserRepo userRepo){
        this.orderRepo = orderRepo;
        this.userRepo =  userRepo;
    }
    public Order createOrder(CreateOrderRequest createOrderRequest){

        UUID uuid = UUID.fromString("363543e3-f587-4d65-9aaa-e805b5da3acf");
        System.out.println(uuid);
        try {
            User u = userRepo.findById(UUID.fromString("363543e3-f587-4d65-9aaa-e805b5da3acf")).get();
            Order order = new Order();
            order.setIcao(createOrderRequest.getIcao());
            order.setTailNumber(createOrderRequest.getTailNumber());
            order.setRequestedVolume(createOrderRequest.getRequestedVolume());
            order.setStartDate(createOrderRequest.getStartDate());
            order.setEndDate(createOrderRequest.getEndDate());
            order.setStatus(OrderStatus.PENDING.toString());
            order.setUser(u);

            order = orderRepo.save(order);
            return order;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public List<Order> getOrders(){
        return orderRepo.findAll();
    }

    public Order updateOrderStatus(UUID orderId, OrderStatusRequest orderStatusRequest){
        Order order =  orderRepo.getReferenceById(orderId);
        order.setStatus(orderStatusRequest.getStatus());
        orderRepo.save(order);
        return order;
    }

}
