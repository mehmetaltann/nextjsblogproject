export async function getAllBlogs (params) 
{ const response = await axios.get("/api/blog");
    return response.data.blogs;
}