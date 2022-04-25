// import { useRoute } from "@react-navigation/native";

export default function useParams() {
  const { params } = useRoute();

  return {
    itemId: params?.itemId,
    collectionId: params?.collectionId,
  }
}