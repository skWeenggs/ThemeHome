const getPageTitle=(pathname)=>{
    switch (pathname) {
        case '/':
          return 'Home Page';
        case '/pricing':
            return 'Price Page';
        case '/blog':
          return 'Blog Page';
        case '/register':
          return 'Registration Page';
        
        case '/dashboard':
          return 'Home Page';

        case '/content':
          return 'Content Page';

        case '/pages':
          return 'Pages Page';

        case '/authors':
          return 'Authors Page';

        case '/analysis':
          return 'Analyticks Page';

        case '/domain':
          return 'Domain Page';

        case '/settings':
          return 'Settings Page';

        default:
          return 'ChatG App';
      }
}
export default getPageTitle;