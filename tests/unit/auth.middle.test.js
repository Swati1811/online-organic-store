const {User}=require('../../model/user');
const mongoose=require('mongoose');
const auth=require('../../middleware/auth');

describe('auth',()=>{
    it('auth in middleware',()=>{
        const user={ _id: mongoose.Types.ObjectId().toHexString(),isAdmin:true};
        const token=new User(user).generateAuthToken();
        
        const req={
            header:jest.fn().mockReturnValue(token)
        };
        const res={};
        const next=jest.fn();

        auth(req,res,next);

        expect(req.user).toBeDefined();
    })
})