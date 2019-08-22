let server;
const request=require('supertest');
const {Product}=require('../../model/product');
const {User}=require('../../model/user');

describe('/api/products',()=>{
    beforeEach(()=>{
        server=require('../../index');
       
    })

    afterEach(async()=>{
        server.close();
        await Product.remove({});
    })

    describe('GET/',()=>{
        it('getting all the products',async()=>{
            await Product.collection.insertMany([
                {name:'product1'},
                {name:'product2'},
            ]);

            const res=await request(server).get('/api/products');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(p=>p.name==='product1')).toBeTruthy();
        });
    });

    describe('GET /:id',()=>{
        it('get by id',async()=>{
            const product=new Product({title:'title1',price:1,imageUrl:'ghvhvmhjhg',category:'fruits'});
            await product.save();

            const res=await request(server).get('/api/products/'+ product._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('title',product.title);
        })
    });

    describe('POST/',()=>{
        it('post the data',async()=>{
            const res=await request(server).post('/api/products').send({title:'title1',price:1,imageUrl:'ghvhvmhjhg',category:'fruits'});
            expect(res.status).toBe(401);
        });

        it('post the data with wrong data..title less than 5',async()=>{

            const token=new User().generateAuthToken();

            const res=await request(server)
                            .post('/api/products')
                            .set('x-auth-token',token)
                            .send({title:'t',price:1,imageUrl:'ghvhvmhjhg',category:'fruits'});
            expect(res.status).toBe(400);
        });

        it('post the data with wrong data..title more than 50',async()=>{

            const token=new User().generateAuthToken();
            const title=new Array(52).join('s');
            const res=await request(server)
                            .post('/api/products')
                            .set('x-auth-token',token)
                            .send({title:title,price:1,imageUrl:'ghvhvmhjhg',category:'fruits'});
            expect(res.status).toBe(400);
        });

        it('post the right data',async()=>{

            const token=new User().generateAuthToken();
            const res=await request(server)
                            .post('/api/products')
                            .set('x-auth-token',token)
                            .send({title:'title1',price:1,imageUrl:'ghvhvmhjhg',category:'fruits'});

            const product=await Product.find({title:'title1'})                
            expect(product).not.toBeNull();
        });

        it('post the right data',async()=>{

            const token=new User().generateAuthToken();
            const res=await request(server)
                            .post('/api/products')
                            .set('x-auth-token',token)
                            .send({title:'title1',price:1,imageUrl:'ghvhvmhjhg',category:'fruits'});
              
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('title');
            expect(res.body).toHaveProperty('price');
            expect(res.body).toHaveProperty('imageUrl');
            expect(res.body).toHaveProperty('category');
        });
    })
})