
import { Request, Response } from "express";
import { scrapeWebsite } from "./service";

export async function scrapeWebsitehandle(req: Request, res: Response) {
  const { user_id, website_id } = req.body;

  if (!user_id || !website_id) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields: user_id and website_id are required",
    });
  }

  try {
    console.log("Scraping started...");
    const data = await scrapeWebsite(user_id, website_id);

   
    console.log("Scraping compelted successfully");
    return res.status(200).json({
      success: true,
      website_id: data.website_id,
      logo_url: data.logo_url,
      statuscode: data.status_code,
      message:data.status_message
    });

  } catch (error) {
    console.error("Scrape handler error:", error);
    return res.status(500).json({
      success: false,
      error: "An error occurred while scraping website data",
    });
  }
}
