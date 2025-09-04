package com.ucig.fuelpass.services;

import com.ucig.fuelpass.dtos.OrderDTO;
import com.ucig.fuelpass.enums.OrderStatus;
import com.ucig.fuelpass.exceptions.InternalErrorException;
import com.ucig.fuelpass.exceptions.NotFoundException;
import com.ucig.fuelpass.models.Order;
import com.ucig.fuelpass.models.User;
import com.ucig.fuelpass.requests.CreateOrderRequest;
import com.ucig.fuelpass.requests.OrderStatusRequest;
import com.ucig.fuelpass.repositories.OrderRepo;
import com.ucig.fuelpass.repositories.UserRepo;
import org.springframework.stereotype.Service;

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
    public Order createOrder(CreateOrderRequest createOrderRequest, User user){

        try {
            Order order = new Order();
            order.setIcao(createOrderRequest.getIcao());
            order.setTailNumber(createOrderRequest.getTailNumber());
            order.setRequestedVolume(createOrderRequest.getRequestedVolume());
            order.setStartDate(createOrderRequest.getStartDate());
            order.setCreatedAt(System.currentTimeMillis());
            order.setUpdatedAt(System.currentTimeMillis());
            order.setEndDate(createOrderRequest.getEndDate());
            order.setStatus(OrderStatus.PENDING.toString());
            order.setUser(user);

            order = orderRepo.save(order);
            return order;
        }catch (Exception e){
            e.printStackTrace();
            throw new InternalErrorException("Failed to create order");
        }
    }

    public List<OrderDTO> getOrders(){
        try {
            List<Order> orders = orderRepo.findAll();
            return orders.stream().map(order -> new OrderDTO(order.getId(), order.getIcao(), order.getTailNumber(), order.getRequestedVolume(), order.getStatus(), order.getStartDate(),
                    order.getCreatedAt(), order.getUpdatedAt(), order.getEndDate(), order.getUser())).toList();
        }catch (Exception e){
            e.printStackTrace();
            throw new InternalErrorException("Failed to retrieve the orders");
        }
    }

    public OrderDTO updateOrderStatus(String orderId, OrderStatusRequest orderStatusRequest, User user){
        try {
            Order order = orderRepo.getReferenceById(UUID.fromString(orderId));
            if(!order.getStatus().equals(orderStatusRequest.getStatus())) {
                order.setStatus(orderStatusRequest.getStatus());
                order.setUpdatedAt(System.currentTimeMillis());
                order.setUser(user);
                orderRepo.save(order);
            }
            return new OrderDTO(order.getId(), order.getIcao(), order.getTailNumber(), order.getRequestedVolume(), order.getStatus(), order.getStartDate(),
                    order.getCreatedAt(), order.getUpdatedAt(), order.getEndDate(), order.getUser());
        }catch (Exception e){
            e.printStackTrace();
            throw new NotFoundException("Could not find the order");
        }
    }

}
