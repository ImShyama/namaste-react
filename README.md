# Nameste React 👨‍💻

Episode-02

- npm init
-

# Parcel - parceljs.org

- Dev Build
- Local Server
- HMR = Hot Module Replacement
- File Watching Algorithm = written in c++
- Caching - Faster Builds
- Image Optimization
- Minification
- Bundling
- Compress
- Consistent Hashing
- Code splitting
- Differential Bundling - support older browsers
- Diagnostic
- Error Handling
- HTTPS
- Tree Shaking - remove unused code
- Different dev and prod bundles

# Browser List - browserslist.dev

# Food Ordering App

- Header
  - Logo
  - Nav Items
- Body
  - Search
  - RestaurantContainer
      -RestaurantCard
         -image
         -Name of Res, star rating, cuisine, delery time
- Footer
  - Copyright
  - Links
  - Address
  - Contact

# Use of key in looping

- not using keys (not acceptable) <<<<<< index as a key <<<<<<<<<<<<<< unique id (best practice)

# There are two types pf Export/Import

- Default Export/Import

export defult const_name;
import const_name from 'path';

- Named Export/Import

export const_name (while initializing const_name);
import {const_name} from 'path';


# React Hooks
 (Normal JS utility function)
 - useState() - Superpowerful State variable in react
    - A hook is just a normal javascript function given by React, pre-build, which comes with some super power, is like uility function given by react

    - Always create a useState variable inside a function component and never create useState outside of function component

    - Try to call useState on top, because javasvript is single thraded language, its execuate line by line, its always maintain the consistancy

    - Never create a useState inside a if-else, this is perfectly valid code but it will create in-consistant in program

    - Never create inside for loop
 
 - useEffect() - 
    - if no dependency array => useEffect is called on every rander Ex- useEffect(()=>{
      console.log("useEffect rander")
    });

    - if dependency array is empty = [] => useEffect is called on initial render Ex- useEffect(()=>{
      console.log("useEffect Called")
    },[]);

    - if dependency array has element = [login] => useEffect is called on login updated Ex- useEffect(()=>{
      console.log("useEffect Called")
    },[login]);


# JSON Viewer
  - It is a Chrome extension for printing the most beautiful and customizable JSON/JSONP highlighter that your eyes have ever seen


# Allow CORS
  - It is a Chrome extension for handle CORS error
  - Allow CORS: Access-Control-Allow-Origin lets you easily perform cross-domain Ajax requests in web applications.
  - This is usefull for development purpose while we are in localhost

# CORSPROXY.IO
 - A fast & simple way to fix CORS Errors
 - USES - https://corsproxy.io/?OUR_API_LINK

# Shimmer UI
  - A better way to show loading states

# React Router Dom

# useRouteError
  

# 2 types Routing in web apps
  - Client Side Routing
  - Server Side Routing