import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, HttpResponse<unknown>>();

  constructor() { }

  setCache (url:string, event:HttpResponse<unknown>){
    this.cache.set(url,event)
  }

  UpdateCache(url:string, event:HttpResponse<unknown>):void{
    this.cache.delete(url)
    this.cache.set(url,event)
  }

  getCacheByUrl(url:string): HttpResponse<unknown> | null{
    var response= this.cache.get(url)

    if(response){
      return response
    }

    return null
  }

  getURLStartWith(path:string): string[]{
    return Array.from(this.cache.keys()).filter(key => key.startsWith(path));  
  }

  DeleteAllCache(){
    this.cache.clear()
  }

  DeleteCacheByUrl(path:string){
    this.cache.delete(path)
  }
}
