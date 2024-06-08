export const dynamic = "force-dynamic"; // defaults to auto
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const filePath = path.join(
    process.cwd(),
    "",
    "/public/timelines/sample.json"
  );
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);
  return new Response(JSON.stringify(data));
}
