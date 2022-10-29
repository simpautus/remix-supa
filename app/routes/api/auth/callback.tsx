// // Working hack to post window.location.hash credentials
// // to login action.
// export const loader: LoaderFunction = ({ request }) => {
//   return new Response(
//     `
//     <style>
//       body {
//         background-color: rgb(44, 44, 44);
//       }
//     </style>
//     <form id="auth" action="login" method="post">
//       <input type="hidden" id="credentials" name="credentials" />
//     </form>
//     <script>
//       document.getElementById("credentials").value = window.location.hash.replace("#", "");
//       document.getElementById("auth").submit();
//     </script>
//     `,
//     {
//       headers: new Headers({ 'Content-Type': 'text/html' }),
//     }
//   )
// }

import { useSignIn } from '~/utils/use-sign-in'

export default function Callback() {
  // Uses the supabase onAuthStateChange subscription callback to post
  // to login action. Comment out the useOnSignInCallBack hook below if
  // you want to use this one.
  const { useOnAuthStateChange } = useSignIn()
  useOnAuthStateChange()

  // // Uses the useLocation location hash credentials to post
  // // to login action. Comment out the useOnAuthStateChange hook above if
  // // you want to use this one.
  // const { useOnSignInCallBack } = useSignIn()
  // useOnSignInCallBack()

  return null
}
