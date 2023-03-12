import {OrderDAO} from "@root/order/dao/order.dao";
import {OrderCollectionMock} from "@root/shared/mocks/data-mocks/order.mock";
import {OrderService} from "@root/order/service/order.service";
import {OrderMapper} from "@root/order/mapper/order/order.mapper";


describe('Order Service', ()=>{
    describe('getOrdersByRestaurant',()=>{

        it('should return with orders if restaurant has order',async ()=>{

            const getByRestaurantSpy= jest.spyOn(OrderDAO,'getOrdersByRestaurant').mockResolvedValue([OrderCollectionMock.order]);
            const orders = await OrderService.getOrdersByRestaurant(OrderCollectionMock.order.restaurantId);

            expect(getByRestaurantSpy).toHaveBeenCalledWith(OrderCollectionMock.order.restaurantId);
            expect(orders).toEqual(OrderMapper.mapToDTOList([OrderCollectionMock.order]));
        });

        it('should return with empty list if restaurant has no order',async ()=>{

            const getByRestaurantSpy= jest.spyOn(OrderDAO,'getOrdersByRestaurant').mockResolvedValue([]);
            const orders = await OrderService.getOrdersByRestaurant(OrderCollectionMock.order.restaurantId);

            expect(getByRestaurantSpy).toHaveBeenCalledWith(OrderCollectionMock.order.restaurantId);
            expect(orders).toEqual([]);
        });

        it('should throw error if has problem with mongo query',async ()=>{

            const getByRestaurantSpy= jest.spyOn(OrderDAO,'getOrdersByRestaurant').mockRejectedValue(new Error('some problem'));
            try {

                await OrderService.getOrdersByRestaurant(OrderCollectionMock.order.restaurantId);

                expect(getByRestaurantSpy).toHaveBeenCalledWith(OrderCollectionMock.order.restaurantId);

            }catch (error){
                expect(error.message).toEqual('some problem');
            }
        });
    });

    describe('getOrdersByTable',()=>{

        it('should return with orders if restaurant table has order',async ()=>{

            const getByTableSpy= jest.spyOn(OrderDAO,'getOrdersByTable').mockResolvedValue([OrderCollectionMock.order]);
            const orders = await OrderService.getOrdersByTable(OrderCollectionMock.order.table);

            expect(getByTableSpy).toHaveBeenCalledWith(OrderCollectionMock.order.table);
            expect(orders).toEqual(OrderMapper.mapToDTOList([OrderCollectionMock.order]));
        });

        it('should return with empty list if restaurant table has no order',async ()=>{

            const getByTableSpy= jest.spyOn(OrderDAO,'getOrdersByTable').mockResolvedValue([]);
            const orders = await OrderService.getOrdersByTable(OrderCollectionMock.order.table);

            expect(getByTableSpy).toHaveBeenCalledWith(OrderCollectionMock.order.table);
            expect(orders).toEqual([]);
        });

        it('should throw error if has problem with mongo query by table',async ()=>{

            const getByTableSpy= jest.spyOn(OrderDAO,'getOrdersByTable').mockRejectedValue(new Error('some problem'));
            try {

                await OrderService.getOrdersByTable(OrderCollectionMock.order.table);

                expect(getByTableSpy).toHaveBeenCalledWith(OrderCollectionMock.order.table);

            }catch (error){
                expect(error.message).toEqual('some problem');
            }
        });
    });

    describe('patchOrder',()=>{

        it('should update an order if call patch order',async ()=>{

            const patchOrderSpy= jest.spyOn(OrderDAO,'patchOrder').mockResolvedValue(OrderCollectionMock.patchedOrderDAO);
            const order = await OrderService.patchOrder(OrderCollectionMock.patchOrder);
            expect(patchOrderSpy).toHaveBeenCalledWith(OrderCollectionMock.patchOrder);
            expect(order).toEqual(OrderMapper.mapToDTO(OrderCollectionMock.patchedOrderDAO));
        });

        it('should throw error if updated order cannot back from dao',async ()=>{

            const patchOrderSpy= jest.spyOn(OrderDAO,'patchOrder').mockResolvedValue(null);
            try {

                await OrderService.patchOrder(OrderCollectionMock.patchOrder);

                expect(patchOrderSpy).toHaveBeenCalledWith(OrderCollectionMock.patchOrder);

            }catch (error){
                expect(error.message).toEqual(`Order modify was no successfully`);
            }
        });
    });

    describe('deleteOrder',()=>{

        it('should call delete query in dao',async ()=>{

            const deleteOrderSpy= jest.spyOn(OrderDAO,'deleteOrder').mockResolvedValue(null);
            await OrderService.deleteOrder(OrderCollectionMock.order._id.toString());

            expect(deleteOrderSpy).toHaveBeenCalledWith(OrderCollectionMock.order._id.toString());
        });


        it('should throw error if has problem with mongo delete query',async ()=>{

            const deleteOrderSpy= jest.spyOn(OrderDAO,'deleteOrder').mockRejectedValue(new Error('some problem'));
            try {

                await OrderService.deleteOrder(OrderCollectionMock.order._id.toString());

                expect(deleteOrderSpy).toHaveBeenCalledWith(OrderCollectionMock.order._id.toString());

            }catch (error){
                expect(error.message).toEqual('some problem');
            }
        });
    });

    describe('postOrder',()=>{

        it('should return with new order',async ()=>{

            const postOrderSpy= jest.spyOn(OrderDAO,'postOrder').mockResolvedValue(OrderCollectionMock.order);
            const order= await OrderService.postOrder(OrderCollectionMock.postOrder);
            const expectedOrder = OrderMapper.mapToDTO(OrderCollectionMock.order);

            expect(postOrderSpy).toHaveBeenCalledWith(OrderCollectionMock.postOrder);
            expect(order.items).toEqual(expectedOrder.items);
            expect(order.amount).toEqual(expectedOrder.amount);
            expect(order.table).toEqual(expectedOrder.table);
            expect(order.restaurantId).toEqual(expectedOrder.restaurantId);
            expect(postOrderSpy).toHaveBeenCalled();
        });


        it('should throw error if dao return with null',async ()=>{

            const postOrderSpy= jest.spyOn(OrderDAO,'postOrder').mockResolvedValue(null);
            try {

                await OrderService.postOrder(OrderCollectionMock.postOrder);

                expect(postOrderSpy).toHaveBeenCalledWith(OrderCollectionMock.postOrder);

            }catch (error){
                expect(error.message).toEqual('New order added no successfully');
            }
        });
    });



});