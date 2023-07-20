import { View, Text, ScrollView, Pressable, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParamsList } from '../../../type'
import { SafeAreaView } from 'react-native-safe-area-context'
import BoxForm from '../../../../components/BoxForm'
import EstimateDetails from '../BoxDetailsInput/components/EstimateDetails'
import { Ionicons } from '@expo/vector-icons'
import { getBoxMfgCost, getBoxPrice } from '../../../../utils/Calculations'
import { styles } from '../BoxDetailsInput'
import PaperDetails from '../BoxDetailsInput/components/PaperDetails'
import { boolean } from 'yup'
import ModalBox from '../../../../components/Modal'
import { useDispatch } from 'react-redux'
import { addBoxToClientDetailsAsync, deleteBoxOfClient, deleteBoxOfClientAsync } from '../../../../store/client'
import { useAppDispatch } from '../../../../store'
import * as Print from 'expo-print'
import { shareAsync } from 'expo-sharing'
import { useSelectClientByName } from '../../../../store/selectors'


const FinalDetails = ({ navigation, route }: NativeStackScreenProps<HomeStackParamsList, "FinalDetails">) => {

  const { box } = route.params
  const boxPrice = getBoxPrice(box)
  const [deletePopup, setDeletePopup] = useState<boolean>(false)

  const client = useSelectClientByName(box.client_name)

  const dispatch = useAppDispatch()



  const createDynamicHtml = ()=>{

    const boxCost = getBoxPrice(box)
    const totalCost = (boxCost*Number(box.box_quantity))
    const taxCost = (boxCost*Number(box.box_quantity))*0.18
    const grandTotal = totalCost+taxCost

    const rupees = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
  })

    const currTaxCost = rupees.format(taxCost)
    const currTotalCost = rupees.format(totalCost)
    const currGrandTotal = rupees.format(grandTotal)


    const html = `      <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Corrugated Box Quotation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }

          h1 {
            text-align: center;
          }

          /* Section 1 */
          .section1 {
            margin: 0;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            height: fit-content;
          }

          .section1 > div {
            height: fit-content;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            font-size: 10px;
          }
          h1,
          h2,
          h3,
          h4,
          h5 {
            margin: 2px 0;
          }

          .company-address > h2 {
            color: orange;
            font-weight: bold;
            flex: 1;
            font-size: small;
          }

          .company-address > h2 {
            color: orange;
            font-weight: bold;
            flex: 1;
            font-size: small;
          }

          .company-logo {
            text-align: right;
          }

          .company-name {
            text-align: center;
            color: orange;
            text-decoration: underline;
          }

          /* Section 2 */
          .section2 {
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
            border-bottom: 1px solid orange;
            padding-bottom: 1.5rem;
          }

          /* Section 3 */
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          th,
          td {
            padding: 8px;
            border: 1px solid orange;

          }

          th {
            background-color: rgba(255, 166, 0, 0.211);
          }


          .total-row {
            font-weight: bold;
          }

          .section3-title {
            color: orange;
            margin-bottom: 10px;
          }

          /* Section 4 */
          .section4 {
            margin-top: 20px;
          }

          .terms-conditions {
            color: orange;
          }

          .party-details {
            box-sizing: border-box;
            border: 1px solid orange;
            width: 40%;
            height: fit-content;
            font-size: 12px;
          }

          .party-details > h3 {
            text-align: center;
            font-size: 14px;
            background-color: rgba(255, 166, 0, 0.296);
            padding: 10px;
          }

          .party-details > div {
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            min-height: 4rem;
          }

          .party-details > div > h4 {
            text-align: center;
            font-size: 12px;
            font-weight: 800;
          }
        </style>
      </head>
      <body>
        <h1 style="font-size: medium; margin-bottom: 3rem">
          Corrugated Box Quotation
        </h1>

        <!-- Section 1 -->
        <div class="section1" style="margin-bottom: 2rem">
          <div>
            <h3>Date : 25/11/1997</h3>
            <h3>Quotation No : 543534</h3>
          </div>
        </div>

        <!-- Section 2 -->
        <div class="section2" style="margin-bottom: 2rem">
          <!-- Self -->
          <div class="party-details">
            <h3>From</h3>
            <div>
              <h4>Swami Narayan Industries</h4>
              <h5>Bhiwandi, Thane</h5>
              <h5>421302,</h5>
              <h5>9764839434</h5>
            </div>
          </div>
          <!-- Client name -->
          <div class="party-details">
            <h3>To</h3>
            <div>
              <h4>${client.client_name}</h4>
              <h5>${client.client_email}</h5>
              <h5>${client.client_phone}</h5>
            </div>
          </div>
        </div>

    <div style="height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;" >
      <div>
       <h2 class="section3-title" style="font-size: 1rem">Quotation Details</h2>
       <table style="font-size: 12px">
      <thead> <tr>
      <th style="text-align: center;" >Item</th>
      <th>Description</th>
      <th>Quantity</th>
      <th>Unit Price</th>
      <th>Total</th>
    </tr></thead>

    <tbody>
    <tr>
      <td style="text-align: center;" >
      <div>
      <h3>${box.box_name}</h3>
      </div>
      </td>
      <td>
      <h4>${box.ply_number} Ply Box,</h4>
      <h4>Dimentions : ${box.outer_length}"X${box.outer_width}"X${box.outer_width}"</h4>
      </td>
      <td style="text-align: center;" >${box.box_quantity}</td>
      <td style="text-align: center;" >${String(boxCost)}</td>
      <td style="text-align: center;" >${currTotalCost}</td>
 
    </tr>
    <!-- Add more rows for additional items if needed -->
    <tr class="total-row">
      <td colspan="3" style="border: none"></td>
      <td>Subtotal</td>
      <td style="text-align: center;" >${currTotalCost}</td>
    </tr>
    <tr class="total-row">
      <td colspan="3" style="border: none"></td>
      <td>Tax (18%)</td>
      <td style="text-align: center;" >${currTaxCost}</td>
    </tr>
    <tr class="total-row">
      <td colspan="3" style="border: none"></td>
      <td>Total</td>
      <td style="text-align: center;" >${currGrandTotal}</td>
    </tr>
 </tbody>

     </table>
      </div>
      <div style="position : fixed; bottom : 2rem; right : 1rem ;" >
      <div style="display : flex;     flex-direction: column;" >
      <h3 style="font-size: 0.6rem; text-align: center" >Signature / stamp</h3>
      <h3 style="font-size: 0.8rem" >Swami Narayan Industries</h3>
      </div>
      </div>

    </div>
      </body>
    </html>
  `
  return html
  }

  const handleDeleteBox= async ()=>{
    await dispatch(deleteBoxOfClientAsync({box_name : box.box_name, client_name : box.client_name}))
    navigation.navigate('Home')
  }

   




  const handleGeneratePdf = async ()=>{
    const file  = await Print.printToFileAsync({
      html : createDynamicHtml(),
      base64 : false,
    })

    await shareAsync(file.uri)
  }

 



  return (

    <ScrollView
      style={{ padding: 20, paddingBottom : 40 }}
    >
      <ModalBox onClose={() => setDeletePopup(false)} isVisible={deletePopup} >
        <View style={{ backgroundColor: "#fff", paddingHorizontal: 15, paddingTop: 15, borderRadius: 10 }} >
          <View>
            <Text style={{fontSize : 20, fontWeight : 'bold', marginBottom : 15}} >Delete Box Estimate Details?</Text>
            <Text style={{fontSize : 20, fontWeight : 'bold', textAlign : 'center', color : "#312b98"}}>{box.box_name}</Text>
          </View>

          <View style={{ display: 'flex', flexDirection: "row", gap: 10, marginTop: 25, justifyContent :'center', alignItems : 'center' }} >
            <Pressable
              onPress={handleDeleteBox}
            >
              <Text style={[styles.deleteBoxBtn, { fontSize: 15 }]}>{"Confirm"}</Text>
            </Pressable>

            <Pressable
              onPress={() => setDeletePopup(false)}
            >
              <Text style={[styles.saveBoxBtn, { fontSize: 15 }]}>{"Cancle"}</Text>
            </Pressable>

          </View>
        </View>

      </ModalBox>
      <View style={{ flex: 1, flexDirection: 'row', gap: 10, justifyContent: 'space-between', alignItems: 'center', borderLeftWidth: 3, borderLeftColor: 'orange', paddingLeft: 10, marginBottom: 20 }} >
        {/* <Ionicons name='' size={25} color="#116fdb" /> */}
        <View>
          <Text style={{ fontSize: 22, fontWeight: "700", color: "#0C315A", }} >{box.box_name}</Text>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "grey", }} >{box.client_name}</Text>
        </View>

        <View >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }} >{`${boxPrice} ₹`}</Text>
          <Text style={{ fontSize: 16, color: 'grey', fontStyle: 'italic' }} >{`${box.outer_length}X${box.outer_width}X${box.outer_height}`}</Text>
        </View>
      </View>


      <PaperDetails values={box} />

      <EstimateDetails values={box} />


      <View style={{ flex: 1, flexDirection: 'row', justifyContent: "center", gap: 15 , paddingBottom : 20}} >
        <Pressable

          onPress={() => navigation.navigate('BoxEdit', {box})}
        >
          <Text style={styles.saveBoxBtn}>{"Edit"}</Text>
        </Pressable>
        <Pressable
          onPress={() => setDeletePopup(true)}
        >
          <Text style={styles.deleteBoxBtn}>{"Delete"}</Text>
        </Pressable>
        <Pressable
          onPress={handleGeneratePdf}
        >
          <Text style={styles.warningBoxBtn}>{"Quotation (PDF)"}</Text>
        </Pressable>
      </View>

    </ScrollView>

  )
}

export default FinalDetails


