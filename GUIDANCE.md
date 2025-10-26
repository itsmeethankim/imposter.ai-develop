# Development Guidance
General guide on how to move forward in finishing development of this app and launching it.

## Developer Tools

### Codex CLI
Install and use [Codex CLI](https://github.com/openai/codex) for ALL AI driven development. Ensure you have at least the plus plan.

#### Model Configuration
Run `codex` in the root of this project and then run the `/model` command. Select `gpt-5-codex` as the model and `high` for reasoning. This is currently the best AI model to code with; if you do not set this, development will be slower.

#### MCP Servers
In `~/.codex/config.toml` add the following at the bottom. These are MCP servers that help Codex output quality and accurate code.
```
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]

[mcp_servers.sequential-thinking]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-sequential-thinking"]
```

#### AGENTS.md
Learn what [AGENTS.md](https://github.com/openai/codex/blob/main/docs/getting-started.md#memory-with-agentsmd) does and how to effectively use and maintain it. This is important for ensuring the codebase can evolve quickly and consistently over time with AI coding.

#### Context Windows
Paste this prompt into ChatGPT to learn about context windows.
```
Teach me about context windows and the effects they play in agentic coding tools like Codex CLI or Claude Code and the quality of their outputs. Explain when it is most appropriate to start new conversations and compact conversations when using these tools. Use online resources and community forums to identify specific guidance for Codex CLI.
```
In short, it is important to constantly start (run `/new` command in Codex) and compact conversations (run `/compact` command in Codex) throughout development to prevent AI models from hallucinating more and writing poor quality code.

### Git
All devs must use git. With everyone working on different things simultaneously this will be the best way to ensure nobody overrides changes. At least learn the basics of git add, commit, push, branch, checkout, and merge. Commit code frequently after the AI implements major chunks of code; this ensures you can easily roll back to a working version of the app in case the AI makes a mistake or accidentally deletes code.

#### Pull Requests
Everyone should treat the `main` branch as off-limits meaning no direct pushes to it. All new code changes should start in its own branch and then get merged into `main` via a pull request (PR). At the very least someone else should at least run the code and verify it works properly before merging into main.

## Tech Stack
- Capacitor
  - After further review this should be good enough for now. If performance issues arise, then switching to something like React Native would be worth it, but will take longer
- Supabase
  - Keep as your DB and auth provider for now. Just ensure you understand the costs and limits associated with it.
- RevenueCat
  - Seems like the fastest way to integrate in-app payments with Capacitor. Have AI spec and plan the full integration
- React
  - This is the original framework your whole app was written in and enables it to eventually become a web app; swapping this out means starting from scratch
- Tailwind
  - Handles all the styling (visual UI) and should be kept. Do not use any other styling frameworks

## Development Workflow
The whole dev workflow should fully embrace AI from having it teach you new things to brainstorming new idea to developing new features.

Outlined below is an optimal workflow called that should be followed for all future development. It combines spec-driven development, vibe coding techniques, and acceptance reviews for QA.
1. Start up a new convo in Codex (run `codex` in terminal or `/new` in codex)
2. Explain your objective/feature/idea to Codex by saying something like
   ```
   i want to <explain objective/feature/idea>

   given this, is there anything else i need to clarify or should consider
   ```
3. Answer any questions or explain any details Codex asks you to clarify. If codex begins to write code hit `escape` to stop it; don't let it write any code yet
4. Once you think Codex understands what you want tell it to
   ```
   perform a comprehensive and thorough review of the codebase first before writing a markdown PRD in the prds/ folder outlining a plan of how this will be implemented
   ```
5. This is where you can review the PRD to ensure it is properly scoped; if you don't understand it or don't want to read and verify it, that's okay, skip to the next step.
   - If you do read the PRD and find issues with it, tell Codex what it needs to add, remove, or update; repeat this as many times as needed before moving on
6. If context is low (<50% and the PRD is huge) run `/compact`
7. Begin implementation by telling codex to then
   ```
   fully implement @<type in name of .md file for autocomplete>
   ```
8. Run the app and start testing the new thing implemented; if something is broken simply tell Codex what is wrong and paste in any error logs if available
   - You repeat this step until you think the thing you just implemented is working
   - You can also tell codex to
   ```
   provide me a step-by-step guide of how i can test the latest changes
   ```
9. Tell codex to perform one final review
   ```
   review the PRD again and perform a final comprehensive and thorough review of the code implemented to ensure it aligns with the PRD. fix any issues and ask for clarifications as needed. if the PRD has been fully implemented and is complete, let me know.
   ```
10. From the previous step, if codex makes more changes, then ensure you test the app one more time (go back to step 8), if codex says the PRD is implemented and complete you're done

### Final Testing
For now, write a markdown document in this repo with steps of how to manually test EVERY feature and flow of your app. An example of what this should look like is as follows
```
## Testing new game flow
1. Click "new game"
2. Fill out all fields
3. Click begin "begin"
4. Ensure game shows "started" at the top
5. Verify when I quit the app and open it up I still see the game in progress
```

Until you write actual code tests (unit/integration/E2E), this will be the fastest and best way to verify everything works properly before releasing a new update. You should run through ALL these tests before releasing a new update to ensure your app works properly; given how much development the AI is doing, this is your only safeguard against "bad updates".

You must constantly update this test plan and document every time a new feature is added or a new bug is found. You can also remove old issues or deprecated features as needed.

### Security Analysis
Run this prompt through codex any time you add new API keys or update the database schemas. You can also have ChatGPT generate a better and more thorough prompt if needed.
```
you are an expert security analyst specializing in identifying security issues, risks, and vulnerabilities in codebases. perform a very rigorous review and analysis of the codebase and identify all medium to critical security issues. return a high level summary of your findings.
```

From here you can either go to step 4 of the development workflow outlined above to have it generate a PRD to fix the issues found, or your can run it through a different AI model (Claude Code, Google Gemini, or regular ChatGPT) to determine what security issues need immediate fixing.

### Final Recommendations
- Any time codex adds a new piece of infrastructure (e.g. a caching layer or new DB) or a new library (package.json changes), be **highly** critical of its intentions and attempt to understand why it needs to make this change; oftentimes, there is a simpler solution
- If you don't know something ask codex to explain it to you; if you still can't understand, tell it to dumb down the answer for you; talk back and forth with it and explain the concept in your own words and ask codex to confirm if your understanding is correct
- If you have any concerns like, "are our API keys actually secure", just ask codex—don't hesitate and don't feel like you need to have extra details to write the prompt
- Always learn more about AI tooling and the codebase technologies used to improve your skills and expand your knowledge; this will only help in moving faster and future maintenance

## Release Plan

### Immediate
- [x] Build initial web application/game
- [ ] Finish adding Capacitor to enable cross-platform support (focusing on iOS only)
- [ ] Integrate Supabase DB and Auth
- [ ] Integrate RevenueCat for in-app purchases
- [ ] Test final iOS build
- [ ] Gather/finalize privacy policy and terms of service
- [ ] Submit to App Store for review
- [ ] Make adjustments to app using feedback from Apple if rejected

### Eventually
- [ ] Implement any android specific Capacitor configs/modules
- [ ] Test final Android Capacitor build
- [ ] Submit to Google Play Store
- [ ] Make adjustments to app if rejected

### To Consider
- [ ] Roll out a pure online version (no app download required)
- [ ] Enable the web version to be downloaded as a PWA

## Note on Figma
From here on out, Figma will not be used anymore. It served its purpose of creating the initial app, but you've reached a wall in its capabilities and now need a more powerful AI (Codex) to finish the rest of the app. Any design tweaks should be done through Codex on this repo. You should still be able to emulate your app locally through the browser or XCode simulators.
