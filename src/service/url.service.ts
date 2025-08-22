import { serverConfig } from "../config";
import { CacheRepository } from "../repository/cache.repository";
import { UrlRepository } from "../repository/url.repository";
import { toBase62 } from "../utils/base62";
import { NotFoundError } from "../utils/errors/app.error";


export class UrlService {
    constructor (
        private readonly urlRepository: UrlRepository,
        private readonly cacheRepository: CacheRepository
    ) {}

    async createShortUrl(orginalUrl: string) {
        const nextId =await this.cacheRepository.getNextId();

        const shortUrl = toBase62(nextId);

        const url = await this.urlRepository.create({
            orginalUrl,
            shortUrl
        })

        await this.cacheRepository.setUrlMapping(shortUrl,orginalUrl);

        const baseUrl = serverConfig.BASE_URL;
        const fullUrl = `${baseUrl}/${shortUrl}`;

        return{
            id: url.id.toString(),
            shortUrl,
            orginalUrl,
            fullUrl,
            createdAt: url.createdAt,
            updatedAt: url.updatedAt,
        }
    }

    async getOriginalUrl(shortUrl: string) {
        const orginalUrl = await this.cacheRepository.getUrlMapping(shortUrl);

        if(orginalUrl){
            await this.urlRepository.incrementClicks(shortUrl);
             return{
                orginalUrl,
                shortUrl
            }
        }

        const url = await this.urlRepository.findByShortUrl(shortUrl);

        if(!url){
            throw new NotFoundError("url not found");
        }

         await this.urlRepository.incrementClicks(shortUrl);

         await this.cacheRepository.setUrlMapping(shortUrl,url.orginalUrl)

         return {
            orginalUrl: url.orginalUrl,
            shortUrl,
         }
    }

    async incrementClicks(shortUrl: string) {
        await this.urlRepository.incrementClicks(shortUrl);
        return
    }
}