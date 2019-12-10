'use strict'

var Controller=require("egg").Controller
class HandlemapController extends Controller{
    async findmap(){
        this.ctx.body=await this.service.handlemap.findmap();
    }
}
module.exports=HandlemapController