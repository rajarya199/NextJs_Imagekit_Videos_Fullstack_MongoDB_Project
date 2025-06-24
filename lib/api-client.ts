import { IVideo } from "@/models/Video";
export type VideoFormData = Omit<IVideo, "_id">;

type fetchOptions={
method?:"GET" |"POST"|"PUT"|"DELETE"
body?:any
headers?:Record<string,string>
}

class ApiClient{
    private async fetch<T>(
        endpoint:string,
        options:fetchOptions={}
    ):Promise<T>{
            const { method = "GET", body, headers = {} } = options;
   const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };
     const response = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });
    if(!response.ok){
        throw new Error(await response.text())
    }
    return response.json()
    }

    async getVideos(){
        return this.fetch("/videos")
    }

    async createVideo(videoData:VideoFormData){
        return this.fetch("/videos",{
            method:"POST",
            body:videoData
        })
    }

    async getVideoById(id:string){
          if (!id) throw new Error("Video ID is required");
    return this.fetch<IVideo>(`/videos/${id}`);
    }
}
export const apiClient = new ApiClient();