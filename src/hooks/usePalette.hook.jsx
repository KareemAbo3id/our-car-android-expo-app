// react function /////////////////////////
export default function usePalette() {
  // Primary colors:
  const Primary = '#526ff1';
  const SecPrimary = '#BAD7E9';
  const Primary2 = '#4764e1';

  // bg
  const darkBg = '#263578';
  const darkerBg = '#212e68';

  // dark:
  const PrimDark = '#1a1c1f';
  const SecDark = '#828b92';
  const SecDark2 = '#d0d5da';

  // Laigt
  const PrimLight = '#f2f3f5';
  const SecLight = '#D2DAFF';

  // helper colors:
  const Black = '#000000';
  const White = '#ffffff';
  const Red = '#EB455F';
  const Warning = '#ffd451';
  const Warning2 = '#f1c132';
  const Success = '#28a745';
  const Info = '#2ebdd3';

  // the hook
  return {
    Primary,
    SecPrimary,
    Primary2,
    darkBg,
    darkerBg,
    PrimDark,
    SecDark,
    SecDark2,
    PrimLight,
    SecLight,
    Black,
    White,
    Red,
    Warning,
    Warning2,
    Success,
    Info,
  };
}
