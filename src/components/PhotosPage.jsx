// PhotosPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UploadForm from "./Footer/UploadForm";
import PhotoGallery from "./PhotoGallery";
import "./PhotosPage.css";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function PhotosPage({ loggedIn }) {
  const { category } = useParams();
  const lowerCategory = category?.toLowerCase().replace(/[\s-]/g, "");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);


  const staticPhotos = {
    animales: [     

      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764636471/animal56_eysgpi.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764636456/animal69_bkeqfz.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764636401/animal63_smcvhb.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764636384/animal62_pbmq49.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764636381/animal59_qemhoa.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764636379/animal61_bvztt9.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764636376/animal62_pirlig.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764636376/animal61_dnxegj.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764636376/animal60_wiyqck.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764636373/animal59_rtdgxl.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764636370/animal58_nyoyat.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764636367/animal57_ghkun3.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764636363/animal56_tmya7f.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764636359/animal55_liex21.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764636350/animal54_az2ca8.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764636345/animal52_thii6q.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764636343/animal53_aynuft.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764635605/animal51_cgcdyg.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764453190/biologo-fotos/animales/4c15d5a98571168cf3cdd1c070a70d90.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764451627/biologo-fotos/animales/b63b34e5fc1ad35c22353f81a1822cc4.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764451578/biologo-fotos/animales/d819d9bcf72f7c37e8904d2e1eb440ae.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764451561/biologo-fotos/animales/5903cd259022519d6f5670646cd4fb48.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764451539/biologo-fotos/animales/bb882dcc3b18e86883626cb51610b926.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764451518/biologo-fotos/animales/441bea7fb7ce223d285372717dc246eb.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764451494/biologo-fotos/animales/04c1b9ce5ec4fa39bba0f2067d8764a4.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764451476/biologo-fotos/animales/dd26c530c07fa7eb1b02e6c014d5384f.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764451476/biologo-fotos/animales/dd26c530c07fa7eb1b02e6c014d5384f.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764451461/biologo-fotos/animales/9ec613c7bba2fe9c153afa5350248b4b.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764451396/biologo-fotos/animales/c9d591d77e8dd943280ac6a8b14b3e4a.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764451137/biologo-fotos/animales/8d6e2667b1ff70974e58aa59efc024d2.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1763643017/animal38_v8ic05.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1763643028/animal41_ooqfkp.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1763642996/animal36_gopvgg.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1763642996/animal37_jnnbd9.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1763642995/animal34_lgiuug.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1763642995/animal35_xyymti.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1763642994/animal33_hlcaz1.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1763642982/animal31_hbsssb.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1763642979/animal30_ef7lrm.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1763642975/animal29_cbk88n.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1763642971/animal28_vizjse.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1763642968/animal27_k8usgr.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1763642966/animal26_bp6w2d.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1763642958/animal25_oyvcai.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027815/animal23_fuzmxq.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027815/animal24_bgj5zh.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027815/animal19_bonzoj.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027814/animal22_pigev1.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027814/animal21_km464x.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027814/animal18_ehxmsn.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027813/animal20_aheiid.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027812/animal17_nffeix.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027812/animal16_pfiyww.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027810/animal13_t7pgfg.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027809/animal14_eknrwh.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027809/animal10_xbsp5x.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027809/animal15_ljuyap.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027808/animal12_fixlms.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027808/animal11_d3p4yg.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027808/animal9_q1ndep.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027807/animal8_opyvlv.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027807/animal5_pthjwj.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027807/animal3_q1pmqj.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027807/animal7_jnhtrk.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027807/animal6_nqavt9.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027807/animal4_ets0mo.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027806/animal1_ogysuy.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027806/animal2_tzvud1.jpg"
    ],
    blackandwhite: [
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028536/foto27_ifaycj.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028534/foto26_enufdk.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028532/foto25_hyzkwd.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028530/foto24_fzmt6v.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028529/foto23_tzfdfz.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028528/foto22_an5b6n.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028524/foto21_fg1wzx.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028523/foto20_yrry4s.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028520/foto19_lspetc.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028520/foto18_ebds15.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028518/foto17_xxds1o.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028515/foto16_gtkoaa.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028512/foto15_m72zyw.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028509/foto14_jgb7kt.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028507/foto13_jfd2ba.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028505/foto12_e4pyop.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028499/foto9_bgb6ka.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028497/foto8_wu5dzp.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028495/foto7_eixfhy.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028493/foto6_a4uyda.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028491/foto5_ss9sop.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028490/foto4_wjamwl.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028487/foto3_nfosqn.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028485/foto2_lfjygs.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028483/foto1_sqegkd.jpg"
    ],
    paisajes: [




      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764635881/paisaje16_mlo54e.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764635877/paisaje18_xibbcx.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764635795/paisaje17_bn71nt.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1763565113/paisaje14_yongmu.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028410/paisaje13_jcsjcv.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028408/paisaje12_rmctpr.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028406/paisaje11_u4bsqx.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028405/paisaje10_mz0t35.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028402/paisaje9_lt3aih.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028400/paisaje8_tgqdvx.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028398/paisaje7_c7hbne.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028396/paisaje6_wixzom.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028394/paisaje5_oyvrax.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028394/paisaje4_migxkv.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028391/paisaje3_fxxpxw.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028391/paisaje2_darvil.jpg",
      "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028389/paisaje1_xud8rb.jpg"
    ]
  };

  const loadPhotos = async () => {
    if (!lowerCategory) return;

    setLoading(true);

    try {
      const res = await axios.get(`${backendUrl}/api/photos/category/${lowerCategory}`);
      const dynamicPhotos = res.data?.photos?.map((p) => p.url) || [];
      const allPhotos = [...(staticPhotos[lowerCategory] || []), ...dynamicPhotos.filter(url => !(staticPhotos[lowerCategory] || []).includes(url))];
      setPhotos(allPhotos);
    } catch (err) {
      console.error("Error cargando fotos:", err);
      setPhotos(staticPhotos[lowerCategory] || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, [lowerCategory]);

  if (!lowerCategory || !staticPhotos[lowerCategory]) return <p>Categoría no encontrada</p>;

  if (loading) return <p>Cargando fotos...</p>;

  return (
    <div className="photos-page">
      {loggedIn && <UploadForm categorySelected={lowerCategory} onUploadSuccess={loadPhotos} />}
      <PhotoGallery photos={photos} />
    </div>
  );
}