import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const AddNotes= mutation({
    args:{
        fileId:v.string(),
        notes: v.any(),
        userId: v.string()
    },
    handler: async(ctx, {fileId, notes, userId}) =>{
        const recordId=await ctx.db.query('notes').filter((q)=>q.eq(q.field('fileId'), fileId)).collect();
        if (recordId?.length == 0){
            await ctx.db.insert('notes',{
                fileId,
                notes,
                userId
            })
        }else{
            await ctx.db.patch(recordId[0]._id,{notes:notes})
        }
    }
})

export const GetNotes = query({
    args:{
        fileId: v.string()
    },
    handler: async(ctx, args) => {
        return await ctx.db.query('notes').filter((q)=>q.eq(q.field('fileId'), args.fileId)).collect();
    }
})