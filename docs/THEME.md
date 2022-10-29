# Theming setup
This docs explains how to add new themes to the project. Note that this is client side only code.

## Step 1
1. Go to directory `app/styles/color`.
2. Create a copy light.css and rename it (e.g. my-theme.css).
3. Change all the variables to theme.

## Step 2 
1. Go to `app/styles/core.css` 
2. Add the new theme name to the `:root` class `--themes` variable.

```CSS
/* Example */
:root {
  --themes: light dark my-theme;
}
```

## Step 3
1. Go to `app/root.tsx`
2. Import new theme `import my-theme from "~/styles/color/my-theme.css";`
3. Append the theme to links module
4. Set the media: to `"(prefers-color-scheme: <my-theme>)"`
	- Make sure to name the same as the in Step 2 `--themes` variable
	- We use this to find the theme on first load with Javascript

```Javascript
// Example app/root.tsx
import my-theme from "~/styles/color/my-theme.css";

export const links: LinksFunction = () => {
	return [
		{
	  	rel: "stylesheet",
	  	href: colorDarkCssPath,
	  	media: "(prefers-color-scheme: dark)",
		},
		{
	  	rel: "stylesheet",
	  	href: my-theme,
	  	media: "(prefers-color-scheme: my-theme)",
		},
	]
}
```

## Step 4 (Typescript only)
1. Go to `app/typings/theme.ts`
2. Add the name of the theme to `Themes` type

## How to use
1. Import the `useTheme` hook from `app/context/theme.tsx`
2. Use it inside of you component `const [{ theme }, { toggle }] = useTheme();`
	- `theme: Theme` get the currently set theme
	- `toggle(newTheme: Theme)` set the theme

## How does theming work
1. In `entery.client.tsx` we call `getClientCSSLinks()` to get all stylesheet links. We do 
this by searching for the `media: "(prefers-color-scheme: my-theme)"` query.

2. We load the previously saved theme using `getTheme()` method. This will look 
into local storage and try to get the preferred color scheme from CSS. (local storage if found has priority) 

3. These values are then passed down to the `ThemeProvider` witch load the theme
and enables getting and settings of themes.