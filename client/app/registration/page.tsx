import type { Metadata } from "next";
import { getActiveEvents } from "@/lib/graphql";
import SectionHeader from "@/components/shared/SectionHeader";
import RegistrationPanel from "@/components/sections/join/RegistrationPanel";
import type { ActiveEvent } from "@/lib/types/cms.types";

export const metadata: Metadata = {
  title: "活动报名",
};

export const revalidate = 30;

const MOCK_EVENTS: ActiveEvent[] = [
  {
    id: "1",
    title: "2025 春季欢迎晚会",
    description:
      "欢迎新老成员加入 CSSA 大家庭！晚会将有精彩表演、抽奖环节和自助餐，是认识新朋友的绝佳机会。",
    location: "Student Union Ballroom",
    start_time: "2025-03-15T18:00:00Z",
    capacity: 120,
    registrationCount: 87,
    status: "active",
    form_schema: [
      { field: "name", label: "姓名", type: "text", required: true, placeholder: "请输入您的姓名" },
      { field: "email", label: "邮箱", type: "email", required: true, placeholder: "请输入邮箱" },
      { field: "year", label: "年级", type: "select", required: true, options: ["大一", "大二", "大三", "大四", "研究生"] },
    ],
  },
  {
    id: "2",
    title: "职业发展讲座：Tech Industry 求职经验分享",
    description:
      "邀请在湾区科技公司工作的学长学姐分享求职经验、面试技巧及职场心得，互动 Q&A 环节不容错过。",
    location: "Engineering Hall 101",
    start_time: "2025-03-22T14:00:00Z",
    capacity: 60,
    registrationCount: 60,
    status: "active",
    form_schema: [
      { field: "name", label: "姓名", type: "text", required: true },
      { field: "email", label: "邮箱", type: "email", required: true },
      { field: "major", label: "专业", type: "text", required: false, placeholder: "如 CS、ECE 等" },
      { field: "question", label: "想提问的问题", type: "textarea", required: false, placeholder: "提前告诉我们您最想了解的内容" },
    ],
  },
  {
    id: "3",
    title: "中秋文化节",
    description: "一起赏月、品月饼、猜灯谜，感受浓浓的中秋氛围。活动现场将有传统文化展示及摄影打卡区。",
    location: "Main Quad",
    start_time: "2025-09-12T17:30:00Z",
    capacity: undefined,
    registrationCount: 34,
    status: "active",
    form_schema: [
      { field: "name", label: "姓名", type: "text", required: true },
      { field: "email", label: "邮箱", type: "email", required: true },
      { field: "dietary", label: "饮食限制", type: "select", required: false, options: ["无", "素食", "清真", "其他"] },
    ],
  },
  {
    id: "4",
    title: "羽毛球友谊赛",
    description: "CSSA 年度羽毛球双打友谊赛，欢迎所有水平的选手报名参与，以赛会友，强身健体！",
    location: "Recreation Center Court 3-4",
    start_time: "2025-04-05T10:00:00Z",
    capacity: 32,
    registrationCount: 20,
    status: "active",
    form_schema: [
      { field: "name", label: "姓名", type: "text", required: true },
      { field: "email", label: "邮箱", type: "email", required: true },
      { field: "partner", label: "搭档姓名", type: "text", required: true, placeholder: "双打搭档的姓名" },
      { field: "level", label: "水平自评", type: "select", required: true, options: ["初级", "中级", "高级"] },
    ],
  },
];

export default async function RegistrationPage() {
  const activeEvents = MOCK_EVENTS;
  void getActiveEvents; // TODO: 替换回真实数据

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        title="活动报名"
        subtitle="报名参加我们正在进行的活动"
      />
      {activeEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            当前暂无开放报名的活动。
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            请关注我们的社交媒体获取最新活动信息。
          </p>
        </div>
      ) : (
        <RegistrationPanel events={activeEvents} />
      )}
    </div>
  );
}
