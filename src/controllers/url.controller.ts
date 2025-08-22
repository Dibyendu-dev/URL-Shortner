import { z } from "zod";
import { CacheRepository } from "../repository/cache.repository";
import { UrlRepository } from "../repository/url.repository";
import { publicProcedure } from "../routers/trpc/context";
import { UrlService } from "../service/url.service";
import logger from "../config/logger.config";
import { InternalServerError } from "../utils/errors/app.error";
import { NextFunction, Request, Response } from "express";


const urlService = new UrlService(new UrlRepository(), new CacheRepository());

export const urlController = {

    create: publicProcedure
            .input(
                z.object({
                    orginalUrl: z.string().url('invalid url')
                })
            )
            .mutation( async ({input}) => {
                try {
                    const result = await urlService.createShortUrl(input.orginalUrl)
                    return result
                } catch (error) {
                    logger.error("error creating short url",error)
                    throw new InternalServerError("failed to create short url")
                }   
            }),

    getOrginalUrl: publicProcedure
                   .input(z.object({
                            shortUrl: z.string().min(1, "short url is required")
                        })
                   )
                   .query( async ({input})=> {
                        try {
                            const result = await urlService.getOriginalUrl(input.shortUrl)
                            return result
                        } catch (error) {
                            logger.error("error getting orginal url",error)
                            throw new InternalServerError("failed to get orginal url")
                        }
                   })

}

export async function redirectUrl(req: Request,res: Response,next: NextFunction ) {

    const {shortUrl} = req.params

    const url = await urlService.getOriginalUrl(shortUrl)

    if(!url){
        res.status(404).json({
            success: false,
            message: 'url not found'
        })
        return
    }

    await urlService.incrementClicks(shortUrl);
    
    res.redirect(url.orginalUrl)
}