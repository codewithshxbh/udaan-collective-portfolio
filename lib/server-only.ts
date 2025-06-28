// This file marks server-only code
// Import this in any file that should only run on the server
// This helps Next.js optimize the build by preventing client components
// from importing server-only code

// This approach is recommended by the Next.js team
// See: https://nextjs.org/docs/getting-started/react-essentials#keeping-server-only-code-out-of-client-components

import "server-only";

// Direct database credentials - no environment variables
export const serverEnv = {
  MYSQL_HOST: 'localhost',
  MYSQL_USER: 'root',
  MYSQL_PASSWORD: 'Shubhendu@0205',
  MYSQL_DATABASE: 'udaan_db',
};