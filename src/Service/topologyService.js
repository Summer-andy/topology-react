import Axios from '../utils/Service';

export async function getListByPage(currentPageIndex) {
  return await Axios.get(`/api/topologies?pageIndex=${currentPageIndex}&pageCount=8`);
}


export async function getNodeById(id) {
  return await Axios.get(`/api/topology/${id}`);
}