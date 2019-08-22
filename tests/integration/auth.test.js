let server;
const request=require('supertest');
const {Product}=require('../../model/product');
const {User}=require('../../model/user');

describe('auth',()=>{
    beforeEach(()=>{
        server=require('../../index');
    })

    afterEach(async()=>{
        server.close();
        await Product.remove({});
    })

    let token;

    const exec=()=>{
      return request(server)
                .post('/api/products')
                .set('x-auth-token',token)
                .send({title:'title1',price:1,imageUrl:'ghvhvmhjhg',category:'fruits'});
    };

    beforeEach(()=>{
        token=new User().generateAuthToken();
    })
   

    it('invalid token',async()=>{
        token='';
        const res=await exec();
        expect(res.status).toBe(401);
    });

    it('invalid token',async()=>{
        token='1';
        const res=await exec();
        expect(res.status).toBe(400);
    });

    it('valid token',async()=>{
        const res=await exec();

        expect(res.status).toBe(201);
    });

})