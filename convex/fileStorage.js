import { v } from "convex/values";
import { mutation, query} from "./_generated/server";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const addFile = mutation({
    args: {
        fileId: v.string(),
        storageId: v.string(),
        fileName: v.string(),
        fileUrl: v.string(),
        userId: v.string(),
    },handler: async (ctx, { fileId, storageId, fileName, fileUrl, userId }) => {
        const result = await ctx.db.insert('filesData',{
            fileId,
            storageId,
            fileName,
            fileUrl,
            userId,
        });
        console.log(result);
        return "File added successfully";
    }
});

export const getFilesUrl = mutation({
    args: {
        storageId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.storage.getUrl(args.storageId);
    }
}); 

export const checkFileName = mutation({
    args: {
        fileName: v.string(),
    },
    handler: async (ctx, { fileName }) => {
        const result = await ctx.db.query('filesData').filter((q) => q.eq(q.field('fileName'), fileName)).collect();
        return result.length > 0;
    }
});

export const getFileInfo = mutation({
    args: {
        fileId: v.string(),
    },handler: async (ctx, { fileId }) => {
        const result = await ctx.db.query('filesData').filter((q) => q.eq(q.field('fileId'), fileId)).collect();
        return result[0];
    }
});

export const getAllFiles = query({
    args: {
        userId: v.string(),
    },handler: async (ctx, { userId }) => {
        const result = await ctx.db.query('filesData').filter((q) => q.eq(q.field('userId'), userId)).collect();
        return result;
    }
});