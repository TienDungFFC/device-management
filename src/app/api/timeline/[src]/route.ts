export const dynamic = "force-dynamic"; // defaults to auto
import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params: { src } }: { params: { src: string } }
) {
  const filePath = path.join(
    process.cwd(),
    "",
    `/public/timelines/${src}.json`
  );
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);
  console.log("data josn: ", data);
  return new Response(JSON.stringify(data));
}
