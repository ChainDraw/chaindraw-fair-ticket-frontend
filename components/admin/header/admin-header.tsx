export default function AdminHeader() {
  return (
    <header className="flex items-center h-[--admin-header-height] p-4 border-b border-b-[#ddd]">
      <div className="w-[--admin-sidebar-width] font-bold">chaindraw</div>
      <div className="flex-1 flex justify-between items-center w-full">
        <h1 className="font-bold">新建演出</h1>
        <div>xxx@gmail.com</div>
      </div>
    </header>
  );
}
