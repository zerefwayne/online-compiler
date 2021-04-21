#include <stdio.h>
#include <iostream>

#define lli long long int

int main()
{
  lli x = 0;

  for (lli i = 0; i < 99999999; i++)
  {
    x = i;
  }
  printf("%lld\n", x);
  return 0;
}
