import  { Suspense, lazy }  from 'react'
import Layout from './components/layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


// Lazy load everything else — only download when user navigates there
const Home = lazy(()=> import('./pages/Home'))
const RepoProfile = lazy(()=> import('./pages/RepoProfile'))
const NotFound = lazy(()=> import('./pages/NotFound'))
const Compare = lazy(()=> import('./pages/Compare'))


// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        <p className="text-sm text-gray-500">Loading page...</p>
      </div>
    </div>
  );
}


const App = () => {
  return (
    <div>
      <BrowserRouter>
       <Routes>
         <Route path='/' element={<Layout/>} />

          <Route
          path='/home' 
          element={
          <Suspense fallback={<PageLoader/>}>
            <Home/>
          </Suspense>} />

          <Route 
          path='repo/:owner/:repo' 
          element={
          <Suspense fallback={<PageLoader/>}>
            <RepoProfile/>
          </Suspense>} />

          <Route
          path='/compare' 
          element={
          <Suspense fallback={<PageLoader/>}>
            <Compare/>
          </Suspense>} />

          <Route 
          path='*' 
          element={
          <Suspense fallback={<PageLoader/>}>
            <NotFound />
          </Suspense>} />

       </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App