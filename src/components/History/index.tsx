import Increase from "@/components/CreateCharts/EditorChart/Increase";
import Normal from "@/components/CreateCharts/EditorChart/Normal";
import RenderPieChart from "@/components/CreateCharts/EditorChart/RenderPieChart";
import { historyMessage } from "@/services/demo";
import ProCard from "@ant-design/pro-card";
import { PageContainer } from "@ant-design/pro-layout";
import { useEffect, useState } from "react";

export default ({ }) => {
  
  const [data, setdata] = useState([])
  useEffect(() => {
    historyMessage({}).then(res => {
      if (res.code === 200) {
        setdata(res.data)
      }
    })
  }, [])


  return (<div
    style={{
      background: '#F5F7FA',
      margin: 24,
      height: '100%'
    }}
  >
    <PageContainer
      tabProps={{
        type: 'editable-card',
        hideAdd: true,
        onEdit: (e, action) => console.log(e, action),
      }}
    >
      <ProCard direction="column" ghost gutter={[0, 16]} style={{ minHeight: 700, marginLeft: '15%', marginRight: '15%', width: '70%' }}>
        {data.map((item, index) => {
          let type = null
          if (item.text !== '测试' && item.text) {
            const getData = JSON.parse(item.text)
            if (getData.origin) {
              type = getData.origin
              console.log(type)
            }
          }
          if (type) {
            const getData = JSON.parse(item.text)
            console.log(getData, getData.data)
            if (type === 'PieChart')
              return <ProCard title={`测试图表${index}`} gutter={16} style={{ minHeight: 200, marginTop: 12 }}>
                <RenderPieChart
                  id={item.id}
                  data={getData.data}
                  downloadButton={getData.downloadButton}
                  legend={getData.legend}
                  space={getData.space} />
                <div>
                  {getData.remark}
                </div>
              </ProCard>
            if (type === 'LineChart')
              return <ProCard title={`测试图表${index}`} gutter={16} style={{ minHeight: 200, marginTop: 12 }}>
                <Normal
                  id={item.id}
                  data={getData.data || getData.resuledata}
                  downloadButton={getData.downloadButton}
                  legend={getData.legend}
                  yAxisName={getData.yAxisName}
                  stack={getData.stack}
                  zoomTool={getData.zoomTool} />
                <div>
                  {getData.remark}
                </div>
              </ProCard>
            if (type === 'IncreaseChart')
              return <ProCard title={`测试图表${index}`} gutter={16} style={{ minHeight: 200, marginTop: 12 }}>
                <Increase
                  id={item.id}
                  data={getData.data || getData.resuledata}
                  yAxisName={getData.yAxisName}
                  stack={getData.stack}
                  zoomTool={getData.zoomTool}
                  datePicker={getData.datePicker} />
                <div>
                  {getData.remark}
                </div>
              </ProCard>
          }
        })}
      </ProCard>
    </PageContainer>
  </div>)
}