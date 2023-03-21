import { useNavigation } from '@react-navigation/native';
// imports ////////////////////////////////

// react function /////////////////////////
export default function useNav() {
  // local hooks:
  const navigation = useNavigation();

  // local handlers:
  const to = (path) => navigation.navigate(path);
  const Back = () => navigation.goBack();

  // the hook
  return { to, Back };
}
