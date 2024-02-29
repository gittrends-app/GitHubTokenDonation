import { GitHubUser } from "../app/api/github/route";

const GH_BASE_URL = "https://api.github.com/";

export async function getGithubProfile(token: string): Promise<GitHubUser> {
  return fetch(GH_BASE_URL + "user", {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  }).then((response) => response.json());
}
