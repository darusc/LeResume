export async function useGithub(owner: string) {
  const res = await fetch(`https://api.github.com/users/${owner}/repos`);
  const json = await res.json();

  const data: GithubRepo[] = json.map((repo: any) => (
    {
      name: repo.name,
      description: repo.description,
      language: repo.language,
      url: repo.html_url.substring(8)
    }
  ));

  return data;
}

export const languages: { [lang: string]: string } = {
  'C': '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  'Python': '#3572A5',
  'Objective-C': '#438eff',
  'Swift': '#F05138',
  'Objective-C++': '#6866fb',
  'Java': '#b07219',
  'Kotlin': '#A97BFF',
  'Dart': '#00B4AB',
  'JavaScript': '#f1e05a',
  'TypeScript': '#3178c6',
  'PHP': '#4F5D95',
  'Go': '#00ADD8',
  'Rust': '#dea584',
  'Ruby': '#701516',
  'Scala': '#c22d40'
}